import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock SvelteKit's navigation and page functions
vi.mock("$app/navigation", () => ({
	goto: vi.fn(),
	invalidate: vi.fn(),
}));

vi.mock("$app/stores", () => ({
	page: {
		subscribe: vi.fn(),
	},
	navigating: {
		subscribe: vi.fn(),
	},
})); 