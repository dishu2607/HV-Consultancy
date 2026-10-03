/**
 * Plain card wrapper. (Previously a cursor-tracked 3D tilt with a pointer
 * glow; removed for a calmer, more professional feel. `glow` is accepted but
 * unused so existing call sites keep working.)
 */
// eslint-disable-next-line no-unused-vars
export default function TiltCard({ children, className, glow }) {
  return <div className={className}>{children}</div>;
}
