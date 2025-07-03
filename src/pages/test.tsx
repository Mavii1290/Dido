import Image from "next/image";

const TestScroll = () => {
  const sample = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    title: `Item ${i + 1}`,
    img: "/assets/imgs/dido/products/partanna_can.png",
    new_price: 3.36,
  }));

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex gap-4 min-w-max bg-gray-100 p-4">
        {sample.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-48 bg-white p-2 border rounded text-center">
            <Image src={item.img} alt={item.title} width={150} height={150} className="object-contain mb-2" />
            <p>{item.title}</p>
            <p>${item.new_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestScroll;
