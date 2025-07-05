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
import { EditIcon, SaveIcon, SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import Cookies from "js-cookie";

import {
    updateEmail,
    userEmailRegistration,
    userEmailValidation,
} from "@/lib/actions/user-settings";

type EmailFormValues = {
    email: string;
};

type CodeFormValues = {
    code: string;
};

const ChangeEmailModal = ({ userEmail }: { userEmail: any }) => {
    const [open, setOpen] = useState(false);

    const {
        register: registerEmailInput,
        handleSubmit: handleEmailSubmit,
        getValues: getValuesEmailForm,
        formState: { errors: emailErrors },
    } = useForm<EmailFormValues>();

    const {
        register: registerCodeInput,
        handleSubmit: handleCodeSubmit,
        formState: { errors: codeErrors },
    } = useForm<CodeFormValues>();

    async function onSubmitEmail(data: EmailFormValues) {
        const res = await userEmailRegistration(data.email);
        if (res.error) {
            toast.error(res.error || "Error sending confirmation code");
        } else {
            toast.success("Code sent successfully");
        }
    }

    const onSubmitCode = async (data: CodeFormValues) => {
        const res = await userEmailValidation(data.code);
        if (res.error) {
            toast.error(res.error || "Error with confirmation code");
        } else {
            toast.success("Code Correct");
        }
    };

    async function onUpdateEmail(data: EmailFormValues) {
        const res = await updateEmail(data.email);
        if (res.error) {
            toast.error(res.error || "Error sending confirmation code");
        } else {
            toast.success("Email changed successfully");
            Cookies.remove("um");
            setOpen(false);
        }
    }

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
                        <DialogTitle>Change Email Address</DialogTitle>
                        <DialogDescription>
                            Enter your new email address below.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {/* EMAIL FORM */}
                        <form
                            onSubmit={handleEmailSubmit(onSubmitEmail)}
                            className="grid gap-2"
                        >
                            <Label htmlFor="email">Enter New Email</Label>
                            <Input
                                id="email"
                                type="email"
                                defaultValue={userEmail}
                                placeholder="m@example.com"
                                {...registerEmailInput("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter a valid email address",
                                    },
                                })}
                            />
                            {emailErrors.email && (
                                <p className="text-sm text-red-500">
                                    {emailErrors.email.message}
                                </p>
                            )}
                            <Button type="submit" variant="outline">
                                Send Code <SendIcon />
                            </Button>
                        </form>

                        {/* CODE FORM */}
                        <form
                            onSubmit={handleCodeSubmit(onSubmitCode)}
                            className="grid gap-2"
                        >
                            <Label htmlFor="code">Enter Verification Code</Label>
                            <Input
                                id="code"
                                type="text"
                                placeholder="123456"
                                {...registerCodeInput("code", {
                                    required: "Code is required",
                                    pattern: {
                                        value: /^\d+$/,
                                        message: "Only numbers are allowed",
                                    },
                                })}
                            />
                            {codeErrors.code && (
                                <p className="text-sm text-red-500">
                                    {codeErrors.code.message}
                                </p>
                            )}
                            <Button type="submit">Verify Code</Button>
                        </form>
                        <DialogFooter>
                            <Button
                                type="button"
                                onClick={() =>
                                    onUpdateEmail({ email: getValuesEmailForm("email") })
                                }
                            >
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
