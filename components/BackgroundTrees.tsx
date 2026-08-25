import Image from "next/image";

const leaves = [
  { left: "8%", top: "18%", size: 26, rotate: -28, delay: "0s" },
  { left: "23%", top: "46%", size: 18, rotate: 34, delay: "1.5s" },
  { left: "78%", top: "14%", size: 22, rotate: 42, delay: "0.8s" },
  { left: "88%", top: "37%", size: 30, rotate: -22, delay: "2.2s" },
  { left: "70%", top: "68%", size: 17, rotate: 28, delay: "1.1s" },
  { left: "13%", top: "82%", size: 21, rotate: 58, delay: "2.8s" },
  { left: "46%", top: "91%", size: 28, rotate: -38, delay: "1.8s" },
];

export default function BackgroundTrees() {
  return (
    <div className="brand-background" aria-hidden="true">
      <div className="brand-ghost brand-ghost-one">
        <Image src="/logo.png" alt="" width={180} height={146} />
      </div>
      <div className="brand-ghost brand-ghost-two">
        <Image src="/logo.png" alt="" width={140} height={114} />
      </div>
      {leaves.map((leaf, index) => (
        <span
          className="brand-leaf"
          key={index}
          style={{
            left: leaf.left,
            top: leaf.top,
            width: leaf.size,
            height: leaf.size * 1.55,
            transform: "rotate(" + leaf.rotate + "deg)",
            animationDelay: leaf.delay,
          }}
        />
      ))}
    </div>
  );
}
