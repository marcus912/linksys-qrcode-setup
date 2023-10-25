import MainCard from "../../../ui-component/cards/MainCard";
import AccountProfile from "./AccountProfile";
import LinksysAccountCard from "./LinksysAccountCard";

const LinksysAccountInfo = () => {
    return (
        <MainCard title="Account">
            <AccountProfile/>
            <LinksysAccountCard/>
        </MainCard>
    );
}

export default LinksysAccountInfo;