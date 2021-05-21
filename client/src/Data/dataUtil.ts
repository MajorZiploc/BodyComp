import { jsonRefactor as jr } from 'json-test-utility';

export function formatQueryParams(json?: any) {
  if (json === null || json === undefined) return '';
  const qps = jr.toKeyValArray(json).filter(kv => kv.value);
  return qps.length === 0 ? '' : '?' + qps.map(ele => ele.key + '=' + ele.value).join('&');
}
