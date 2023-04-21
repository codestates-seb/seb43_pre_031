import styled from 'styled-components';

const TagInput = ({ tags, setTags }) => {
  const addTag = (e) => {
    if (
      tags.length < 5 &&
      !tags.includes(e.target.value) &&
      e.target.value !== ''
    ) {
      setTags([...tags, e.target.value]);
      e.target.value = '';
    } else if (e.target.value === '') {
      e.target.value = '';
    }
  };

  const removeTag = (idx) => {
    setTags(
      tags.filter((el) => {
        return el !== tags[idx];
      })
    );
  };
  return (
    <TagsInputWrapper>
      <ul id="tags">
        {tags &&
          tags.map((i, idx) => (
            <li key={idx} className="tag">
              <span className="tag-title">{i}</span>
              <span
                role="presentation"
                className="close"
                onClick={() => {
                  removeTag(idx);
                }}
              >
                x
              </span>
            </li>
          ))}
      </ul>
      <Input
        type="text"
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            addTag(e);
          }
        }}
        placeholder="e.g.(typescript asp.net-mvc ios)"
      />
    </TagsInputWrapper>
  );
};

const TagsInputWrapper = styled.div`
  width: 100%;
  padding: 0.8rem 0.9rem;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  border-radius: ${(props) => props.theme.common.borderRadius};
  border: 1px solid ${(props) => props.theme.color.black200};

  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    color: ${(props) => props.theme.color.blue600};

    > li {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      list-style: none;
      padding: 0.2rem 0.4rem;
      margin-right: 0.5rem;
      border-radius: ${(props) => props.theme.common.borderRadius};
      background: ${(props) => props.theme.color.powder200};

      .close {
        margin-left: 0.5rem;
        font-size: 1.5rem;
        font-weight: 900;
        padding: 0 0.2rem;
        cursor: pointer;

        &:hover {
          color: ${(props) => props.theme.color.blue100};
          background-color: ${(props) => props.theme.color.blue600};
          border-radius: ${(props) => props.theme.common.borderRadius};
        }
      }
    }
  }

  &:focus-within {
    border: 1px solid ${(props) => props.theme.color.blue300};
    outline: ${(props) => props.theme.color.blue100} solid 0.4rem;
  }
`;
const Input = styled.input`
  width: 50%;
  color: ${(props) => props.theme.color.black200};
  padding: 0.3rem;
  border: none;
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme.color.black200};
  }
`;

export default TagInput;
