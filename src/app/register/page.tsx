"use client";

import { useState } from "react";

// ユーザー型
type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

// 仮DB（今はlocalStorageで代用）
const saveUser = (user: User) => {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  // メールアドレス重複チェック
  if (users.some((u) => u.email === user.email)) {
    throw new Error("このメールアドレスは既に登録済みです。");
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
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

      saveUser(newUser);
      setMessage("登録が完了しました！");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>会員登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ユーザー名：</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>メールアドレス：</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>パスワード：</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>
        <button type="submit">登録</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
