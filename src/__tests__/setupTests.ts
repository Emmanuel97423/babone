import matchers from '@testing-library/jest-dom/matchers';
import {expect, afterEach, test, describe} from 'vitest'
import { cleanup } from '@testing-library/react';
import { mockWindows, clearMocks, mockIPC } from "@tauri-apps/api/mocks"
import { invoke } from "@tauri-apps/api/tauri";
import { randomFillSync } from "crypto";

expect.extend(matchers);

// jsdom doesn't come with a WebCrypto implementation
// beforeAll(() => {
//   //@ts-ignore
//   window.crypto = {
//     getRandomValues: function (buffer: Uint8Array): Uint8Array {
//       return randomFillSync(buffer);
//     },
//   };
// });

afterEach(() => {
  clearMocks()
  cleanup();
});

test("mocked windows", () => {
   mockWindows("main", "second", "third");

   expect(window).toHaveProperty("__TAURI_METADATA__")
})

test("no mocked windows", () => {
   expect(window).not.toHaveProperty("__TAURI_METADATA__")
})

test("mocked command", () => {
 mockIPC((cmd, args) => {
  switch (cmd) {
    case "add":
      return (args.a as number) + (args.b as number);
      break;
    default:
    }
 });
 expect(invoke('add', { a: 12, b: 15 })).resolves.toBe(27);
})

