export const UserBoard = () => {
  return (
    <section className="user-wrapper">
      <div className="user-imgBox"></div>
      <div className="user-info">
        <h1>user</h1>
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
        <button>Edit profile</button>
        <button>Network profile</button>
      </div>
    </section>
  );
};
