import type { SeoMetadataInput } from '../domain/types';
import { useRouteSeo } from '../hooks/useRouteSeo';

export function SeoHead(props: SeoMetadataInput) {
  useRouteSeo(props);
  return null;
}
