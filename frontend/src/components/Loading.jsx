const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="loading-box" role="status" aria-live="polite">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
};

export default Loading;
