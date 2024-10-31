import * as React from "react";

const Socket: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="2" />
    <circle cx="12" cy="12" r="6" />
    <path d="M10 11v2" />
    <path d="M14 11v2" />
  </svg>
);

export default Socket;
