const WhatsAppButton = ({ productName }: { productName: string }) => {
  const phoneNumber = "+919741310797"; // Replace with your actual WhatsApp number
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const message = `Hi, I'm really interested in buying this product: ${productName}. Just wanted to check if it's available.\n\n${currentUrl}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsAppUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 border-[1px] border-gray-400 font-mono rounded-md bg-green-500 font-bold text-center text-white hover:bg-green-600 transition-colors duration-300"
    >
      Order on WhatsApp
    </a>
  );
};
export default WhatsAppButton;