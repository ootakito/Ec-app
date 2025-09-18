"use client";
import { useState } from "react";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

const loadUsers = (): User[] => {
  const raw = localStorage.getItem("users");
  return raw ? (JSON.parse(raw) as User[]) : [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem("users", JSON.stringify(users));
};

const addUser = (user: User) => {
  const users = loadUsers();
  // any を使わず、User 型として扱う
  if (users.some((u: User) => u.email === user.email)) {
    throw new Error("このメールアドレスは既に登録済みです。");
  }
  users.push(user);
  saveUsers(users);
};

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUser: User = {
        id: Date.now(),
        username,
        email,
        password,
      };
      addUser(newUser);
      setMessage("登録が完了しました！");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err: unknown) {
      // any を使わず unknown → 絞り込み
      if (err instanceof Error) setMessage(err.message);
      else setMessage("登録に失敗しました。");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>会員登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ユーザー名：</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>メールアドレス：</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>パスワード：</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required />
        </div>
        <button type="submit">登録</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
