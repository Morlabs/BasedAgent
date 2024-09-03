import React, { useState, useEffect } from "react";
import Combobox from "./formUI/Combobox";
import ToggleSwitch from "./formUI/ToggleSwitch";
import { getProfile, upsertProfile } from "@/actions/profile.api";
import LoaderLocal from "@/components/common/loaderLocal";
import { countries } from "@/utils/constants/countries";

function Profile({ id }) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [loading, setLoading] = useState(false);


	if (loading) {
		return (
			<div className="flex flex-col justify-center items-center h-full relative">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
					<LoaderLocal />
					<div className="mt-4 text-center">Loading</div>
				</div>
			</div>
		);
	}

	return (
		<>

			{/* Profile section */}
			<div className="px-4 py-6 sm:p-6 lg:pb-8">
				<div>
					<h2 className="text-lg font-medium leading-6 text-[#dadee2]">
						Profile
					</h2>
					<p className="mt-1 text-sm text-[#dadee2]">
						This information will be displayed publicly so be careful what you
						share.
					</p>
				</div>

				<div className="mt-6 grid grid-cols-12 gap-6">

					{/*<div className="col-span-12 sm:col-span-6">*/}
					{/*	<label*/}
					{/*		htmlFor="last-name"*/}
					{/*		className="block text-sm font-medium leading-6 text-[#dadee2]"*/}
					{/*	>*/}
					{/*		Wallet Address*/}
					{/*	</label>*/}
					{/*	<input*/}
					{/*		id="last-name"*/}
					{/*		name="last-name"*/}
					{/*		type="text"*/}
					{/*		value={lastName}*/}
					{/*		onChange={(e) => setLastName(e.target.value)}*/}
					{/*		autoComplete="family-name"*/}
					{/*		className="mt-2 bg-[#0b0b0c] block w-full rounded-md border-0 px-3 py-1.5 shadow-sm placeholder:text-gray-400 focus:border-0 sm:text-sm sm:leading-6"*/}
					{/*	/>*/}
					{/*</div>*/}


					<div className="mt-6">
						<w3m-button />

					</div>
				</div>
			</div>

		</>


	)
		;
}

export default Profile;
