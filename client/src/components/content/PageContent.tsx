import classes from "./PageContent.module.css";

const PageContent:React.FC<{title: string, children:React.ReactNode }> = ({ title, children }) => {
  return (
    <div className={classes['text-zone']}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
