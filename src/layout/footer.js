import textCSS from '@/styles/layout/footer.scss?inline';

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = `
  <style>
    ${textCSS}
  </style>
  <footer class="footer">
    <section class="footer_contents">
      <nav class="footer_util">
        <span><a href="https://www.tving.com/help/notice" target="_blank" rel="noopener noreferrer">고객센터</a></span>
        <span><a href="https://www.tving.com/policy/terms" target="_blank" rel="noopener noreferrer">이용약관</a></span>
        <span><a href="https://www.tving.com/policy/privacy" target="_blank" rel="noopener noreferrer">개인정보처리방침</a></span>
        <span><a href="https://www.tving.com/policy/youth" target="_blank" rel="noopener noreferrer">청소년 보호정책</a></span>
        <span><a href="https://www.tving.com/policy/legal" target="_blank" rel="noopener noreferrer">법적고지</a></span>
        <span><a href="https://www.tving.com/event/list" target="_blank" rel="noopener noreferrer">이벤트</a></span>
        <span><a href="https://team.tving.com/" target="_blank" rel="noopener noreferrer">인재채용</a></span>
      </nav>
      <div class="copyright_container">
        <p>
          <span>대표이사 : YANG JIEUL</span>
          <span>사업자정보확인</span>
          <span>사업자등록번호 : 188-88-01893</span>
          <span>통신판매신고번호 : 2020-서울마포-3641호</span>
        </p>
        <p>
          <span
            >사업장 : 서울특별시 마포구 상암산로 34, DMC디지털큐브
            15층(상암동)</span
          >
          <span>호스팅사업자 : 씨제이올리브네트웍스(주)</span>
        </p>
        <p>
          <span>고객문의 바로가기</span>
          <span>대표메일 : tving@cj.net</span>
          <span>고객센터 : 1670-1525 (평일/주말 09시~18시, 공휴일 휴무)</span>
        </p>
        <p>
          <span
            >ENM 시청자 상담실(편성 문의 및 시청자 의견) : 080-080-0780</span
          >
          <span>Mnet 고객센터(방송편성문의) : 185501631</span>
        </p>
      </div>
      <div class="SNS">
        <div class="SNS_icon youtube">
          <a href="https://www.youtube.com/c/TVING_official" target="_blank" rel="noopener noreferrer">
            <img src="/image/youtube.svg" alt="타잉 유튜브" />
          </a>
        </div>
        <div class="SNS_icon instagram">
          <a href="https://www.instagram.com/tving.official/" target="_blank" rel="noopener noreferrer">
            <img src="/image/instagram.svg" alt="타잉 인스타그램" />
          </a>
        </div>
        <div class="SNS_icon twitter">
          <a href="https://x.com/tvingdotcom" target="_blank" rel="noopener noreferrer">
            <img src="/image/twitter.svg" alt="타잉 트위터" />
          </a>
        </div>
        <div class="SNS_icon facebook">
          <a href="https://www.facebook.com/CJTVING/" target="_blank" rel="noopener noreferrer">
            <img src="/image/facebook.svg" alt="타잉 페이스북" />
          </a>
        </div>
      </div>
      <p class="copyright">Copyright © 주식회사 티빙 All right reserved.</p>
    </section>
  </footer>
`;

export class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(footerTemplate.content.cloneNode(true));
  }
}

customElements.define('c-footer', Footer);
