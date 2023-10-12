import {
	initialSelectionState,
	updateSelectedServices,
	calculatePrice,
	SelectionState,
} from "./index";

describe("Price Calculation", () => {
	it("should calculate price for photography in 2020", () => {
		const state: SelectionState = {
			...initialSelectionState,
			photography: true,
		};
		const result = calculatePrice(2020, state);
		expect(result.basePrice).toBe(1700);
		expect(result.finalPrice).toBe(1700);
	});

	it("should give free wedding session with photography in 2022", () => {
		const state: SelectionState = {
			...initialSelectionState,
			photography: true,
			weddingSession: true,
		};
		const result = calculatePrice(2022, state);
		expect(result.basePrice).toBe(2200);
		expect(result.finalPrice).toBe(1900);
	});

    it("should calculate price for video in 2020", () => {
        const state: SelectionState = {
            ...initialSelectionState,
            video: true,
        };
        const result = calculatePrice(2020, state);
        expect(result.basePrice).toBe(1700);
        expect(result.finalPrice).toBe(1700);
    });

    it("should calculate package price for both photography and video in 2021", () => {
        const state: SelectionState = {
            ...initialSelectionState,
            photography: true,
            video: true,
        };
        const result = calculatePrice(2021, state);
        expect(result.basePrice).toBe(2300);
        expect(result.finalPrice).toBe(1000);
    });

    it("should give a discount for wedding session with video in 2021", () => {
        const state: SelectionState = {
            ...initialSelectionState,
            video: true,
            weddingSession: true,
        };
        const result = calculatePrice(2021, state);
        expect(result.basePrice).toBe(2400);
        expect(result.finalPrice).toBe(2100);
    });

    it("should calculate price for bluRay with video in 2022", () => {
        const state: SelectionState = {
            ...initialSelectionState,
            video: true,
            bluRay: true,
        };
        const result = calculatePrice(2022, state);
        expect(result.basePrice).toBe(2200);
        expect(result.finalPrice).toBe(2200);
    });

    it("should calculate price for two-day event with photography in 2020", () => {
        const state: SelectionState = {
            ...initialSelectionState,
            photography: true,
            twoDayEvent: true,
        };
        const result = calculatePrice(2020, state);
        expect(result.basePrice).toBe(2100);
        expect(result.finalPrice).toBe(2100);
    });
});

describe("Service Selection", () => {
	it("should select a service", () => {
		const result = updateSelectedServices(
			initialSelectionState,
			"photography",
			"select"
		);
		expect(result.photography).toBe(true);
	});

	it("should deselect a service", () => {
		const state: SelectionState = {
			...initialSelectionState,
			photography: true,
		};
		const result = updateSelectedServices(state, "photography", "deselect");
		expect(result.photography).toBe(false);
	});

    it("should select multiple services", () => {
        let state = updateSelectedServices(initialSelectionState, "photography", "select");
        state = updateSelectedServices(state, "video", "select");
        state = updateSelectedServices(state, "weddingSession", "select");

        expect(state.photography).toBe(true);
        expect(state.video).toBe(true);
        expect(state.weddingSession).toBe(true);
    });

    it("should deselect a service from multiple selected", () => {
        let state: SelectionState = {
            ...initialSelectionState,
            photography: true,
            video: true,
            weddingSession: true,
        };

        state = updateSelectedServices(state, "weddingSession", "deselect");

        expect(state.photography).toBe(true);
        expect(state.video).toBe(true);
        expect(state.weddingSession).toBe(false);
    });
});
