{
  // 에러를 세부적으로 상속할 클래스가 존재한다고 가정.
  class TimeoutError extends Error {}
  class OfflineError extends Error {}

  class NetworkClient {
    tryConnect(): void {
      throw new OfflineError("no network!");
    }
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

  // 가능한 가장 우아하게 할 수 있는곳에서 캐치하는게 중요하다.
  const client = new NetworkClient();
  const service = new UserService(client);
  const app = new App(service);
  app.run();
}
