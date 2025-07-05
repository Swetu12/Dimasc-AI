"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EditIcon, SaveIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { userResetPassword } from "@/lib/actions/user-settings";

type FormValues = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

const ChangeEmailModal = () => {
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        const res = await userResetPassword(data.currentPassword, data.newPassword);

        if (res.error) {
            toast.error(res.error || "error with confirmation code");
        } else {
            toast.success("Password reset successfully.");
            setOpen(false);
        }
    };

    return (
        <div>
            <Toaster position={`top-center`} richColors />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size="icon" variant="outline">
                        <EditIcon />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                            Enter your new new password below.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {/* EMAIL FORM */}
                        <Label htmlFor="currentPassword">Enter Current Password</Label>
                        <Input
                            id="currentPassword"
                            type="password"
                            placeholder="Enter your current password"
                            {...register("currentPassword", {
                                required: "Current password is required",
                            })}
                        />
                        {errors.currentPassword && (
                            <p className="text-sm text-red-500">
                                {errors.currentPassword.message}
                            </p>
                        )}

                        <Label htmlFor="newPassword">Enter New Password</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            placeholder="Enter your new password"
                            {...register("newPassword", {
                                required: "New password is required",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                    message:
                                        "Must be 8+ characters with uppercase, lowercase, number & special character",
                                },
                            })}
                        />
                        {errors.newPassword && (
                            <p className="text-sm text-red-500">
                                {errors.newPassword.message}
                            </p>
                        )}

                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Re-enter your new password"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === getValues("newPassword") ||
                                    "Passwords do not match",
                            })}
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                        <DialogFooter>
                            <Button type="button" onClick={handleSubmit(onSubmit)}>
                                <SaveIcon /> Save Changes
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ChangeEmailModal;
