import { ChangeEvent, useRef, useState, KeyboardEvent, useEffect } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { MAIN_PATH, SEARCH_PATH } from "components";

//컴포넌트 : Header Layout
export default function Header() {

  //함수 : 네비게이트 함수
  const navigate = useNavigate();

  // 이벤트 헨들러 : 로고 클릭 이벤트 처리 함수
  const onLogoClickHandler = () => {
    navigate(MAIN_PATH());
  };

  // 컴포넌트 : 검색 버튼 컴포넌트
  const SearchButton = () => {
    //스테이트 : 검색어 입력 요소 참조 상태
    const searchButtonRef = useRef<HTMLDivElement | null>(null);

    // 스테이트 : 검색 버튼 상태
    const [status, setStatus] = useState<boolean>(false);

    // 스테이트 : 검색어 상태
    const [word, setWord] = useState<string>("");

    //스테이트 : 검색어 path variable 상태
    const { searchWord } = useParams();

    //이벤트 헨들러 : 검색어 변경 이벤트 처리 함수
    const onSearchWordChangeHandler = (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      const value = event.target.value;
      setWord(value);
    };

    //이벤트 헨들러 : 검색어 키 이벤트 처리 함수
    const onSearchWordKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      if (!searchButtonRef.current) return;
      searchButtonRef.current.click();
    };

    //이벤트 헨들러 : 검색 아이콘 글의 이벤트 처리 함수
    const onSearchButtonClickHandler = () => {
      if (!status) {
        setStatus(!status);
        return;
      }
      navigate(SEARCH_PATH(word));
    };

    // 이펙트 : 검색어 path variable 변경 될때 마다 실행되는 함수
    useEffect(() => {
      if (searchWord) {
        setWord(searchWord);
        setStatus(true);
      }
    }, [searchWord]);

    if (!status)
      // 렌더 : 검색 버튼 컴포넌트 렌더링 : false 상태
      return (
        <div className="icon-button" onClick={onSearchButtonClickHandler}>
          <div className="icon search-light-icon"></div>
        </div>
      );
      
    // 렌더 : 검색 버튼 컴포넌튼 렌더링 : true 상태
    return (
      <div className="header-search-input-box">
        <input
          className="header-search-input"
          type="text"
          placeholder="검색어를 입력해주세요."
          value={word}
          onChange={onSearchWordChangeHandler}
          onKeyDown={onSearchWordKeyDownHandler}
        />
        <div
          ref={searchButtonRef}
          className="icon-button"
          onClick={onSearchButtonClickHandler}
        >
          <div className="icon search-light-icon"></div>
        </div>
      </div>
    );
  };

  //렌더 : Header Layout 렌더러 컴포넌트
  return (
    <div id="header">
      <div className="header-container">
        <div className="header-left-box" onClick={onLogoClickHandler}>
          <div className="icon-box">
            <div className="icon logo-dark-icon"></div>
          </div>
          <div className="header-logo">{"catWashHub"}</div>
        </div>
        <div className="header-right-box">
          <SearchButton></SearchButton>
        </div>
      </div>
    </div>
  );
}