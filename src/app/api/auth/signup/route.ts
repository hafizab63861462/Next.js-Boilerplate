import { NextRequest, NextResponse } from "next/server";
import { signupUser } from "@/service/user";

export const POST = async (req: NextRequest) => {
  const { email, password, confirmPassword } = await req.json();

  const res = await signupUser(email, password, confirmPassword);

  if (res.success) {
    return NextResponse.json(
      { success: true, data: res.data },
      { status: 201 }
    );
  } else {
    return NextResponse.json(
      { success: false, error: res.error },
      { status: 400 }
    );
  }
};
