import { useState } from "react";
import { WorkService } from "../services/workService";
import type { WorkRecord } from "../types/index";
import { formatDate } from "../utils/date";

interface UseWorkHandlerProps {
  workRecords: WorkRecord[];
  setWorkRecords: (records: WorkRecord[]) => void;
}

/**
 * Work 관련 로직을 관리하는 커스텀 훅
 */
export function useWorkHandler(props: UseWorkHandlerProps) {
  const { workRecords, setWorkRecords } = props;

  const [isTimeEditModalOpen, setIsTimeEditModalOpen] = useState(false);
  const [editingDate, setEditingDate] = useState("");
  const [editingCheckIn, setEditingCheckIn] = useState("");
  const [editingCheckOut, setEditingCheckOut] = useState("");
  const [editingIsVacation, setEditingIsVacation] = useState(false);
  const [editingLeaveType, setEditingLeaveType] = useState<"none" | "annual" | "half">("none");

  const handleSaveWorkRecords = (next: WorkRecord[]) => {
    setWorkRecords(next);
    WorkService.saveWorkRecords(next);
  };

  const handleCheckIn = () => {
    const next = WorkService.checkIn(workRecords);
    handleSaveWorkRecords(next);
  };

  const handleCheckOut = () => {
    const next = WorkService.checkOut(workRecords);
    handleSaveWorkRecords(next);
  };

  const handleCheckInEdit = () => {
    const today = formatDate(new Date());
    const rec = workRecords.find((r) => r.date === today);
    setEditingDate(today);
    setEditingCheckIn(rec?.checkIn || "");
    setEditingCheckOut(rec?.checkOut || "");
    setEditingIsVacation(rec?.isVacation || false);
    // leaveType 설정 (하위 호환성 고려)
    setEditingLeaveType(rec?.leaveType || (rec?.isVacation ? "annual" : "none"));
    setIsTimeEditModalOpen(true);
  };

  const handleCheckOutEdit = () => {
    const today = formatDate(new Date());
    const rec = workRecords.find((r) => r.date === today);
    if (!rec || !rec.checkIn) {
      alert("출근 기록이 없습니다.");
      return;
    }
    setEditingDate(today);
    setEditingCheckIn(rec.checkIn);
    setEditingCheckOut(rec.checkOut || "");
    setEditingIsVacation(rec.isVacation || false);
    setEditingLeaveType(rec?.leaveType || (rec?.isVacation ? "annual" : "none"));
    setIsTimeEditModalOpen(true);
  };

  const handleDateEdit = (record: WorkRecord) => {
    const rec = record;
    setEditingDate(rec.date);
    setEditingCheckIn(rec.checkIn || "");
    setEditingCheckOut(rec.checkOut || "");
    setEditingIsVacation(rec.isVacation || false);
    setEditingLeaveType(rec?.leaveType || (rec?.isVacation ? "annual" : "none"));
    setIsTimeEditModalOpen(true);
  };

  const handleSaveTimeEdit = () => {
    let next = WorkService.saveTimeEdit(
      workRecords,
      editingDate,
      editingCheckIn,
      editingCheckOut,
      editingIsVacation,
      editingLeaveType,
    );

    // 일반 근무이고 출퇴근 기록이 모두 비어있으면 해당 날짜 기록 삭제
    if (!editingCheckIn.trim() && !editingCheckOut.trim() && editingLeaveType === "none") {
      next = next.filter((r: WorkRecord) => r.date !== editingDate);
    }

    handleSaveWorkRecords(next);
    setIsTimeEditModalOpen(false);
  };

  const closeTimeEditModal = () => {
    setIsTimeEditModalOpen(false);
  };

  return {
    // Modal state
    isTimeEditModalOpen,
    editingDate,
    editingCheckIn,
    setEditingCheckIn,
    editingCheckOut,
    setEditingCheckOut,
    editingIsVacation,
    setEditingIsVacation,
    editingLeaveType,
    setEditingLeaveType,

    // Handlers
    handleCheckIn,
    handleCheckOut,
    handleCheckInEdit,
    handleCheckOutEdit,
    handleDateEdit,
    handleSaveTimeEdit,
    closeTimeEditModal,
  };
}
