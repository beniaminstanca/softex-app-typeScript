import classes from "./Button.module.css";

const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={classes.actions}>
      <button>{children}</button>
    </div>
  );
};

export default Button;
