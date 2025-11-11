interface LoadingOverlayProps {
  show: boolean;
}

function LoadingOverlay({ show }: LoadingOverlayProps) {
  if (!show) return null;

  return (
    <div
      className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50'
      style={{ pointerEvents: "auto" }} // blocks clicks underneath
    >
      <div className='text-white text-lg font-semibold animate-pulse'>
        Loading...
      </div>
    </div>
  );
}

export default LoadingOverlay;
