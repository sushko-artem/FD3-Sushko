const rainbowFrame =
  (colors: string[]) =>
  <T extends object>(Component: React.FC<T>) =>
  (props: T) => {
    let framedComponent = <Component {...props} />;
    for (const color of colors) {
      framedComponent = (
        <div
          className="border-5 m-2 text-center"
          style={{
            borderColor: color,
          }}
        >
          {framedComponent}
        </div>
      );
    }
    return framedComponent;
  };

export default rainbowFrame;
