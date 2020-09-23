import produce, {enableES5} from 'immer';

//크로스 브라우징 이슈로 인해 immer 사용시 문법 변환 필요
// 직접 만들어서 import 하는 방법이 제일 권장됨

export default (...args) => {
    enableES5();
    return produce(...args);
}