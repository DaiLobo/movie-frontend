import CardWrapper from "./CardWrapper";

const RecentUser = ({login, name}) => (
    <>
      <img
        width={50}
        height={50}
        src={`https://github.com/${login}.png`}
        alt="" />
      <span> {name} </span>
    </>
)

const RecentSearch = ({recentUsers = []}) => {
    return (
        <div>
            <CardWrapper title="Recent Users">
                {recentUsers.map((user) =>
                <RecentUser 
                    key={user} //é usado qndo esta percorrendo uma lista
                    name={user} 
                    login={user}
                />
                )}
            </CardWrapper>
        </div>
    )
}

export default RecentSearch;