// feature
class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    global.console.log(`${name} is now a friend!`);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);

    if (idx === -1) {
      throw new Error('Friend not found!');
    }

    this.friends.splice(idx, 1);
  }
}

// tests
describe('FriendsList', () => {
  let friendsList;

  beforeEach(() => {
    friendsList = new FriendsList();
  });

  it('フレンドリストの初期化ができる', () => {
    expect(friendsList.friends.length).toEqual(0);
  });

  it('フレンドの追加', () => {
    friendsList.addFriend('よしじ');
    expect(friendsList.friends.length).toEqual(1);
  });

  it('フレンド宣言できる', () => {
    friendsList.announceFriendship = jest.fn();

    expect(friendsList.announceFriendship).not.toHaveBeenCalled();
    friendsList.addFriend('よしじ');
    expect(friendsList.announceFriendship).toHaveBeenCalledWith('よしじ');
  });

  describe('フレンドの削除', () => {
    it('リストからフレンドを削除できる', () => {
      friendsList.addFriend('よしじ');
      expect(friendsList.friends[0]).toEqual('よしじ');
      friendsList.removeFriend('よしじ');
      expect(friendsList.friends[0]).toBeUndefined();
    });

    it('存在しないフレンドの場合、例外を投げるのだ', () => {
      expect(() => friendsList.removeFriend('よしじ')).toThrow(
        new Error('Friend not found!'),
      );
    });
  });
});
