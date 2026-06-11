const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`;

/** Film-grain texture over the whole experience. Pure CSS, GPU-cheap. */
export default function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-90 overflow-hidden"
    >
      <div
        className="grain-layer absolute -inset-[100%] opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
            NOISE_SVG
          )}")`,
          backgroundSize: "220px 220px",
        }}
      />
    </div>
  );
}
