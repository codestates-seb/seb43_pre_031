import { Link } from 'react-router-dom';

const UserBoard = () => {
  // const { username } = { userObj };

  return (
    <>
      <section className="user-wrapper">
        <div className="user-imgBox"></div>
        <div className="user-info">
          <h1>username</h1>
          <div>title</div>
          <ul>
            <li>
              <div>
                Member for <span>5 days</span>
              </div>
            </li>
            <li>
              <div>Last seen this week</div>
            </li>
            <li>
              <div>Visited 4 days, 2 consecutive</div>
            </li>
          </ul>
        </div>
        <div className="userboard-btns">
          <Link to="/user/settings">
            <button>Edit profile</button>
          </Link>

          <button>Network profile</button>
        </div>
      </section>
    </>
  );
};

export default UserBoard;
