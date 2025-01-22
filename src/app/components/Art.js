export default function Art() {
  return (
    <div className="sm426:h-[1076px] sm426:w-[48%] sm375:w-[360px] sm350:w-[320px] w-[300px] h-[180px] sm426:order-2 sm426:mt-0 order-1 mt-4">
      <img
        fetchPriority="high"
        alt="Art"
        src="/Art.svg"
        className="w-full h-full object-cover sm426:rounded-lg rounded-[20px]"
      />
    </div>
  );
}
