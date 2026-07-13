import { Link, useParams, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

export default function PaymentResult() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || 'success'; // default to success for mock

  return (
    <main className="container p-xl flex flex-col items-center justify-center text-center" style={{ minHeight: '60vh' }}>
      {status === 'success' ? (
        <>
          <CheckCircle size={64} className="text-primary mb-md" />
          <h1 className="mb-sm">Payment Successful</h1>
          <p className="text-muted mb-lg">
            Your payment for invoice {id} has been received. Your order is now being processed.
          </p>
        </>
      ) : (
        <>
          <XCircle size={64} style={{ color: '#DC2626' }} className="mb-md" />
          <h1 className="mb-sm">Payment Failed</h1>
          <p className="text-muted mb-lg">
            There was an issue processing your payment for invoice {id}. Please try again or contact support.
          </p>
        </>
      )}

      <Link to="/account/orders">
        <button className="btn-secondary">
          <ArrowLeft size={18} /> Return to Dashboard
        </button>
      </Link>
    </main>
  );
}
