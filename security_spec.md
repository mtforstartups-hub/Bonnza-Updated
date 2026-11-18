# Bonnza Firestore Security Specification (`security_spec.md`)

## 1. Data Invariants

1. **Default-Deny Catch-All**: Every path not explicitly matched is unconditionally denied (`allow read, write: if false;`).
2. **Verified Identity & Anti-Spoofing**: All write operations and admin privileges require `request.auth != null` and `request.auth.token.email_verified == true`.
3. **Bootstrapped Owner & Trusted Admin Lookup**: Admin status is granted only if the user is signed in with a verified email matching the bootstrapped owner (`mtforstartups@gmail.com`) or exists in `/databases/$(database)/documents/admins/$(request.auth.uid)`.
4. **No Self-Assigned Roles**: Non-admin users cannot create or modify documents in `/admins/{adminUid}`.
5. **PII & Registration Isolation**: `/registrations/{registrationId}` contains learner registration status and is readable ONLY by `existing().ownerUid == request.auth.uid` or `isAdmin()`. Blanket `isSignedIn()` reads or client-filtered list queries are strictly forbidden.
6. **Terminal State Locking**: Once a registration in `/registrations/{registrationId}` reaches a terminal state (`REFUNDED` or `EXPIRED`), non-admin updates are blocked.
7. **Immutable Audit Logs**: `/audit_logs/{logId}` documents can only be created by `isAdmin()` with `incoming().actorUid == request.auth.uid` and `incoming().createdAt == request.time`, and can NEVER be updated or deleted (`allow update, delete: if false;`).

---

## 2. The "Dirty Dozen" Payloads

1. **Payload 1 (Unauthenticated Write)**: Create `/registrations/reg_01` with `request.auth == null` -> `PERMISSION_DENIED`.
2. **Payload 2 (Unverified Email Admin Spoof)**: Create `/admins/user_02` with `email: "mtforstartups@gmail.com"` and `email_verified: false` -> `PERMISSION_DENIED`.
3. **Payload 3 (Self-Assigned Role Escalation)**: Authenticated non-admin creates `/admins/user_03` with `role: "OWNER"` -> `PERMISSION_DENIED`.
4. **Payload 4 (Shadow Field Injection)**: Create `/registrations/reg_04` with required keys plus extra key `"isVerified": true` -> `PERMISSION_DENIED`.
5. **Payload 5 (Identity Spoofing on Create)**: Create `/registrations/reg_05` where `ownerUid` does not match `request.auth.uid` -> `PERMISSION_DENIED`.
6. **Payload 6 (Path ID Poisoning)**: Create `/registrations/bad$id!with*spaces` violating `^[a-zA-Z0-9_\-]+$` -> `PERMISSION_DENIED`.
7. **Payload 7 (Value Poisoning on Update)**: Update `/registrations/reg_07` setting `sessionId` to `"invalid-session"` -> `PERMISSION_DENIED`.
8. **Payload 8 (Client Payment Confirmation Bypass)**: Non-admin learner updates `/registrations/reg_08` `paymentState` to `"PAID_CONFIRMED"` -> `PERMISSION_DENIED`.
9. **Payload 9 (Terminal State Mutation)**: Non-admin updates `/registrations/reg_09` after `paymentState == "REFUNDED"` -> `PERMISSION_DENIED`.
10. **Payload 10 (Immortal Field Mutation)**: Update `/registrations/reg_10` mutating `createdAt` or `ownerUid` -> `PERMISSION_DENIED`.
11. **Payload 11 (Cross-Tenant PII Read / Blanket List)**: User B attempts `get` or `list` on User A's `/registrations/reg_11` -> `PERMISSION_DENIED`.
12. **Payload 12 (Audit Log Tampering)**: Any user attempts `update` or `delete` on `/audit_logs/log_01` -> `PERMISSION_DENIED`.

---

## 3. Red Team Audit & Conflict Report

| Collection | Identity Spoofing | State Shortcutting | Resource Poisoning | Validation Helper in Update | Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/admins/{adminUid}` | Blocked (`isAdmin()` only, `uid == adminUid`) | Blocked (enum role check) | Blocked (`isValidId`, `.size()` limits) | `isValidAdminProfile(incoming())` wraps update | PASS |
| `/registrations/{registrationId}` | Blocked (`ownerUid == request.auth.uid`) | Learners can only create `DRAFT`; `PAID_CONFIRMED` requires `isAdmin()` | Blocked (`isValidId`, `.size()` limits) | `isValidRegistration(incoming())` wraps update | PASS |
| `/audit_logs/{logId}` | Blocked (`actorUid == request.auth.uid`) | Append-only (`update, delete: if false`) | Blocked (`isValidId`, `.size()` limits) | Immutable (`allow update: if false`) | PASS |
