type Year = 2020 | 2021 | 2022;

interface ServicePrices {
	photography: Record<Year, number>;
	video: Record<Year, number>;
	package: Record<Year, number>;
	weddingSession: number;
	bluRay: number;
	twoDayEvent: number;
}

const prices: ServicePrices = {
	photography: {
		2020: 1700,
		2021: 1800,
		2022: 1900,
	},
	video: {
		2020: 1700,
		2021: 1800,
		2022: 1900,
	},
	package: {
		2020: 2200,
		2021: 2300,
		2022: 2500,
	},
	weddingSession: 600,
	bluRay: 300,
	twoDayEvent: 400,
};

export interface SelectionState {
	photography: boolean;
	video: boolean;
	weddingSession: boolean;
	bluRay: boolean;
	twoDayEvent: boolean;
}

export const initialSelectionState: SelectionState = {
	photography: false,
	video: false,
	weddingSession: false,
	bluRay: false,
	twoDayEvent: false,
};

export function updateSelectedServices(
	state: SelectionState,
	service: keyof SelectionState,
	action: "select" | "deselect"
): SelectionState {
	if (action === "select") {
		return { ...state, [service]: true };
	} else {
		return { ...state, [service]: false };
	}
}

export function calculatePrice(
	year: Year,
	state: SelectionState
): { basePrice: number; finalPrice: number } {
	let basePrice = 0;
	let discount = 0;

	if (state.photography && !state.video) {
		basePrice += prices.photography[year];
	}
	if (state.video && !state.photography) {
		basePrice += prices.video[year];
	}
	if (state.photography && state.video) {
		basePrice = prices.package[year];
		discount +=
			prices.photography[year] + prices.video[year] - prices.package[year];
	}
	if (state.weddingSession) {
		basePrice += prices.weddingSession;
		if (year === 2022 && state.photography) {
			basePrice -= 300; // session is cheaper with photography in 2022
			discount += 300; // session discount with photography or video
		} else if (state.photography || state.video) {
			discount += 300; // session discount with photography or video
		}
	}
	if (state.bluRay && state.video) {
		basePrice += prices.bluRay;
	}
	if (state.twoDayEvent && (state.photography || state.video)) {
		basePrice += prices.twoDayEvent;
	}

	return {
		basePrice,
		finalPrice: basePrice - discount,
	};
}
