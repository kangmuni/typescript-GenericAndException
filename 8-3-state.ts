{
  type NetworkErrorState = {
    result: "fail";
    reason: "offline" | "down" | "timeout";
  };

  type SuccessState = {
    result: "Success";
  };

  type ResultState = SuccessState | NetworkErrorState;
  // 네트워크 에러가 발생할 수 있는것은 코드를 작성할 때 예상할수 있는 코드이다. (성공하면 어떻게 성공하는지, 실패면 어떻게 실패하는지)
  // 예상하지 못하게 throw 남발은 안되고
  // 어떤 상태가 되는지 ResultState를 만드는게 좋다!
  class NetworkClient {
    tryConnect(): ResultState {}
  }

  class UserService {
    constructor(private client: NetworkClient) {}
    login() {
      this.client.tryConnect();
      // login..
    }
  }

  class App {
    constructor(private userService: UserService) {}
    run() {
      try {
        this.userService.login();
      } catch (error) {
        // show dialog to user, 이곳이 UserService보다 더 의미있는 처리를 할 수 있는곳
        //   if(error instanceof OfflineError) {
        //    TypeScript에서 구현된 catch()에는 어떠한 타입정보도 전달되지 않아서 instanceOf를 사용할 수 없다 😭
        //   }
      }
    }
  }

  const client = new NetworkClient();
  const service = new UserService(client);
  const app = new App(service);
  app.run();
}
