import { useRouter } from "next/router";

export default function Post() {
  const { query } = useRouter();
  return `POST [${query.pid}] TODO`;
}
