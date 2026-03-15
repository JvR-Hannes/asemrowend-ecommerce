export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const params = await searchParams;
  const reference = params.reference;

  if (!reference) {
    return <p>Invalid payment reference.</p>;
  }

  return (
    <main className="mx-auto max-w-xl py-16 text-center">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful</h1>
      <p className="mt-4">Thank you for your purchase.</p>
      <p className="mt-2 text-sm text-gray-500">Order reference: {reference}</p>
    </main>
  );
}
