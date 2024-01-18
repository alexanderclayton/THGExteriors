import Radar from "radar-sdk-js";

const TEST_PUBLISHABLE = import.meta.env.VITE_TEST_PUBLISHABLE

Radar.initialize(TEST_PUBLISHABLE);