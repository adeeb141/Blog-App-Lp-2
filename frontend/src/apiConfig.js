const normalizeIp = (value) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : '';
};

const withProtocol = (value) => {
  if (!value) return '';
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  return `http://${value}`;
};

const stripTrailingSlash = (value) => value.replace(/\/+$/, '');

export const getApiBaseUrl = () => {
  const ip = normalizeIp(import.meta.env.VITE_EC2_PUBLIC_IPV4);
  if (!ip) return '';

  const port = (import.meta.env.VITE_BACKEND_PORT || '5000').toString().trim();
  const host = stripTrailingSlash(withProtocol(ip));

  try {
    const parsed = new URL(host);
    if (!parsed.port) parsed.port = port;
    return stripTrailingSlash(parsed.origin);
  } catch {
    return `${host}:${port}`;
  }
};