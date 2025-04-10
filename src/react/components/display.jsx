const Display = ({ input, output, isError }) => {
  return (
    <>
      <input
        type="text"
        readOnly
        value={input || ''}
        className="w-full text-right text-xl text-gray-400 outline-none"
      />
      {input.includes('=') && (
        <input
          type="text"
          readOnly
          value={output === 0 ? '0' : output || ''}
          className={`${isError ? 'text-emberCrimson' : 'text-ionWhite'} w-full text-right ${isError ? 'text-2xl' : 'text-3xl'} outline-none`}
        />
      )}
    </>
  );
};

export default Display;
