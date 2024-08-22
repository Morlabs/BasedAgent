import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import {signOut} from 'next-auth/react';
import Loader from '@/components/common/loader';  // Assuming you have a Loader component
import {ChangeDeveloperPassword, deleteDeveloper} from "@/actions/developer.api";

function Account({id}) {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false); // Add loading state
	const router = useRouter();
	
	async function handleUpdatePassword(event) {
		event.preventDefault();
		if (newPassword !== confirmPassword) {
			alert('New password and confirm password do not match.');
			return;
		}
		
		setLoading(true); // Set loading to true when the operation starts
		
		const passwordData = {
			current_password: currentPassword,
			new_password: newPassword,
		};
		
		try {
			const resp = await ChangeDeveloperPassword(passwordData, id);
			if (resp) {
				alert('Password updated successfully');
			}
		} catch (error) {
			alert('Error updating password: ' + error.message);
			console.error('Error updating password:', error);
		} finally {
			setLoading(false); // Set loading to false when the operation ends
		}
	}
	
	async function handleDeactivateAccount(event) {
		event.preventDefault();
		const confirm = window.confirm('Are you sure you want to deactivate your account?');
		if (!confirm) return;
		
		setLoading(true); // Set loading to true when the operation starts
		
		try {
			await deleteDeveloper(id);
			await signOut({redirect: false, callbackUrl: '/'});
			router.push('/');
		} catch (error) {
			console.error('Error deactivating account:', error);
		} finally {
			setLoading(false); // Set loading to false when the operation ends
		}
	}
	
	if (loading) {
		return (
			<div className="flex flex-col justify-center items-center h-screen">
				<Loader/>
				<div className="mt-4 text-center">Loading</div>
			</div>
		);
	}
	
	return (
		<>
			<form action="#" method="POST" className="divide-y divide-gray-200 lg:col-span-9">
				<div className="px-4 py-6 sm:p-6 lg:pb-8">
					<div>
						<h2 className="text-lg leading-6 text-[#dadee2]">Account</h2>
						<p className="mt-1 text-sm text-[#dadee2]">
							Manage your account settings.
						</p>
					</div>
					
					<div className="mt-6 flex flex-col gap-5">
						<div className="space-y-6">
							<div className='max-w-[200px]'>
								<label htmlFor="current_password"
											 className="block text-sm leading-6 font-bold text-[#dadee2]">
									Current Password
								</label>
								<div className="mt-2">
									<input
										id="current_password"
										name="current_password"
										type="password"
										autoComplete="current_password"
										value={currentPassword}
										onChange={(e) => setCurrentPassword(e.target.value)}
										className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							
							<div className='flex gap-5'>
								<div>
									<label htmlFor="new_password"
												 className="block text-sm leading-6 font-bold text-[#dadee2]">
										New Password
									</label>
									<div className="mt-2">
										<input
											id="new_password"
											name="new_password"
											type="password"
											autoComplete="new_password"
											value={newPassword}
											onChange={(e) => setNewPassword(e.target.value)}
											className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
								
								<div>
									<label htmlFor="confirm_password"
												 className="block text-sm leading-6 font-bold text-[#dadee2]">
										Confirm Password
									</label>
									<div className="mt-2">
										<input
											id="confirm_password"
											name="confirm_password"
											type="password"
											autoComplete="confirm_password"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
							</div>
						</div>
						
						<div className="mt-6 flex-grow lg:mt-0 lg:flex-shrink-0 lg:flex-grow-0">
							<button
								type="submit"
								onClick={handleUpdatePassword}
								className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
							>
								Update Settings
							</button>
						</div>
					</div>
				</div>
				
				<div className="px-4 py-6 sm:p-6">
					<div>
						<h2 className="text-lg leading-6 text-[#dadee2]">Danger Zone</h2>
						<p className="mt-1 text-sm text-[#dadee2]">
							Deactivate your account.
						</p>
					</div>
					
					<div className="mt-6 flex-grow lg:mt-0 lg:flex-shrink-0 lg:flex-grow-0">
						<button
							type="submit"
							onClick={handleDeactivateAccount}
							className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
						>
							Deactivate Account
						</button>
					</div>
				</div>
			</form>
		</>
	);
}

export default Account;
