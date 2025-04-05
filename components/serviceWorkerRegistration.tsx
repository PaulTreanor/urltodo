"use client"

import { useEffect } from "react"
import { register } from "@/lib/register-sw"

export default function ServiceWorkerRegistration() {
	useEffect(() => {
		register();
	}, []);

	return null;
}