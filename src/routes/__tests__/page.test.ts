import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/svelte";
import Page from "../+page.svelte";

describe("Main Page", () => {
	beforeEach(() => {
		render(Page);
	});

	it("should have a main content section with correct role", () => {
		expect(screen.getByRole("main")).toBeInTheDocument();
	});

	it("should display a Discord invitation link with correct URL", () => {
		const discordLink = screen.getByText("Join us!");
		expect(discordLink).toBeInTheDocument();
		expect(discordLink.closest("a")).toHaveAttribute("href", "https://discord.gg/B3JAaXvkCt");
	});

	it("should display all sponsor images with correct alt text", () => {
		const bitsumImages = screen.getAllByAltText("Bitsum");
		expect(bitsumImages).toHaveLength(2);
		expect(screen.getByAltText("The .NET Foundation")).toBeInTheDocument();
	});
}); 