"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { updateProfile } from "@/redux/profile.slice";
import { IUserProfile } from "@/service/user";

interface IProps {
  profile: IUserProfile;
}

export const ProfileProvider = ({ profile }: IProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateProfile(profile));
  }, [profile, dispatch]);
  return <></>;
};
