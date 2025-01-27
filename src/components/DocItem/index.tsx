import DocAction from "./DocAction";
import DocActions from "./DocActions";
import DocContent from "./DocContent";
import DocContentText from "./DocContentText";
import DocFileIcon from "./DocFileIcon";
import DocRoot from "./DocRoot";

const DocItem = {
  Root: DocRoot,
  ContentContainer: DocContent,
  ContentText: DocContentText,
  FileIcon: DocFileIcon,
  Actions: DocActions,
  Action: DocAction,
};

export default DocItem;
