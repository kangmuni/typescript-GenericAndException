// 자바 : Exeption
// 자바스크립트 : Error
// const arr = new Array(1111111111);

// Error(Exeption) Handling: try -> catch -> finally

function readFile(fileName: string): string {
  if (fileName === "not exist😡") {
    throw new Error(`file not exist! ${fileName}`);
  }
  return "file contents📂";
}

function closeFile(fileName: string) {
  //
}

// const fileName = "not exist😡";
// console.log(readFile(fileName));
// closeFile(fileName); 이렇게 하면 노드에서 에러로 나옴!

// const fileName = "not exist😡";
// try {
//   console.log(readFile(fileName));
// } catch (error) {
//   console.log("catched@_@");
// } finally {
//   closeFile(fileName);
//   console.log("finally*_*");
// }
// 마지막에 마무리해야할 일이 있다면 finally 안에서, 밖에서 원하는거 출력 가능하다고 skip하지말기

// 예시
function run() {
  const fileName = "not exist😡";
  try {
    console.log(readFile(fileName));
  } catch (error) {
    console.log("catched@_@");
    return; //  여기서 리턴되면 파일을 닫을 수 가 없음!
  } finally {
    closeFile(fileName);
    console.log("closed*_*");
  } // 그래서 이렇게 꼭 finally 안에서 해주세요!
}

run();
