import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

import {
  FaBuilding,
  FaCalendarAlt,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaFilePdf,
  FaIdCard,
  FaTimes,
} from "react-icons/fa";

import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_API || "http://localhost:2000";

export default function CertificateDetails() {
  const { id } = useParams();

  const [certificate, setCertificate] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [openCertificate, setOpenCertificate] = useState(false);

  // ============================
  // FETCH CERTIFICATE
  // ============================

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `${API}/api/v1/certificate/${id}`
        );

        console.log("Certificate Response:", res.data);

        const data =
          res?.data?.certification ||
          res?.data?.certificate ||
          null;

        setCertificate(data);
      } catch (error) {
        console.error(
          "Certificate fetch error:",
          error
        );

        setError(
          error?.response?.data?.message ||
            "Failed to load certificate details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCertificate();
    }
  }, [id]);

  // ============================
  // FORMAT DATE
  // ============================

  const formatDate = (dateString) => {
    if (!dateString) {
      return "N/A";
    }

    return new Date(dateString).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  // ============================
  // CHECK PDF
  // ============================

  const isPDF = (url) => {
    if (!url) {
      return false;
    }

    const cleanURL = url
      .split("?")[0]
      .toLowerCase();

    return cleanURL.endsWith(".pdf");
  };

  // ============================
  // LOADING
  // ============================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900" />

          <p className="text-slate-600">
            Loading certificate...
          </p>
        </div>
      </div>
    );
  }

  // ============================
  // ERROR
  // ============================

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-xl bg-red-50 px-6 py-5 text-center text-red-600">
          {error}
        </div>
      </div>
    );
  }

  // ============================
  // NOT FOUND
  // ============================

  if (!certificate) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">
          Certificate not found.
        </p>
      </div>
    );
  }

  const certificateFile =
    certificate.image || "";

  const certificateIsPDF =
    isPDF(certificateFile);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">

      {/* ============================
          MAIN CARD
      ============================ */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg"
      >

        {/* ============================
            HEADER
        ============================ */}

        <div className="border-b bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white">

          <p className="mb-2 text-sm text-slate-300">
            Certificate ID: {id}
          </p>

          <h1 className="text-3xl font-bold">
            {certificate.title}
          </h1>

          {certificate.description && (
            <p className="mt-3 max-w-3xl text-slate-200">
              {certificate.description}
            </p>
          )}
        </div>

        {/* ============================
            CONTENT
        ============================ */}

        <div className="grid gap-8 p-6 md:grid-cols-[260px_1fr]">

          {/* ============================
              LEFT SECTION
          ============================ */}

          <div className="flex flex-col items-center rounded-xl bg-slate-100 p-5 text-center">

            {/* CERTIFICATE PREVIEW */}

            <div
              onClick={() => {
                if (certificateFile) {
                  setOpenCertificate(true);
                }
              }}
              className={`mb-5 w-full ${
                certificateFile
                  ? "cursor-pointer"
                  : ""
              }`}
            >

              {certificateFile ? (
                certificateIsPDF ? (

                  // PDF CARD

                  <div className="flex h-44 w-full flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 transition hover:bg-red-100">

                    <FaFilePdf className="text-5xl text-red-500" />

                    <p className="mt-3 font-semibold text-red-700">
                      Certificate PDF
                    </p>

                    <p className="mt-1 text-xs text-red-500">
                      Click to view
                    </p>
                  </div>

                ) : (

                  // IMAGE

                  <img
                    src={certificateFile}
                    alt={certificate.title}
                    className="h-44 w-full rounded-xl object-cover shadow-sm transition hover:opacity-90"
                  />

                )
              ) : (

                // NO FILE

                <div className="flex h-44 w-full items-center justify-center rounded-xl bg-slate-200 text-slate-500">
                  No Certificate File
                </div>
              )}
            </div>

            {/* VERIFIED */}

            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">

              <FaCheckCircle />

              Verified
            </span>

            {/* FEATURED */}

            {certificate.featured && (
              <span className="mt-3 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                Featured
              </span>
            )}

            {/* VIEW FILE */}

            {certificateFile && (
              <button
                onClick={() =>
                  setOpenCertificate(true)
                }
                className="mt-5 w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                {certificateIsPDF
                  ? "View Certificate PDF"
                  : "View Certificate"}
              </button>
            )}
          </div>

          {/* ============================
              RIGHT SECTION
          ============================ */}

          <div>

            {/* INFO CARDS */}

            <div className="grid gap-4 sm:grid-cols-2">

              <InfoCard
                icon={<FaBuilding />}
                label="Issuer"
                value={certificate.issuer}
              />

              <InfoCard
                icon={<FaCalendarAlt />}
                label="Issue Date"
                value={formatDate(
                  certificate.issueDate
                )}
              />

              <InfoCard
                icon={<FaIdCard />}
                label="Credential ID"
                value={
                  certificate.credentialID
                }
              />

              <InfoCard
                icon={<FaCalendarAlt />}
                label="Expiry"
                value={
                  certificate.doesNotExpire
                    ? "Does not expire"
                    : formatDate(
                        certificate.expiryDate
                      )
                }
              />
            </div>

            {/* ============================
                SKILLS
            ============================ */}

            {certificate.skills?.length >
              0 && (
              <div className="mt-7">

                <h2 className="mb-3 text-lg font-semibold text-slate-900">
                  Skills
                </h2>

                <div className="flex flex-wrap gap-2">

                  {certificate.skills.map(
                    (skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>
              </div>
            )}

            {/* ============================
                DESCRIPTION
            ============================ */}

            {certificate.description && (
              <div className="mt-7">

                <h2 className="mb-3 text-lg font-semibold text-slate-900">
                  Details
                </h2>

                <p className="leading-7 text-slate-600">
                  {
                    certificate.description
                  }
                </p>
              </div>
            )}

            {/* ============================
                CREDENTIAL URL
            ============================ */}

            {certificate.credentialURL && (
              <div className="mt-8">

                <a
                  href={
                    certificate.credentialURL
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800"
                >
                  View Credential

                  <FaExternalLinkAlt />
                </a>

              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* ============================
          CERTIFICATE MODAL
      ============================ */}

      <AnimatePresence>

        {openCertificate &&
          certificateFile && (

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={() =>
                setOpenCertificate(false)
              }
            >

              <motion.div
                initial={{
                  scale: 0.9,
                  y: 20,
                }}
                animate={{
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  scale: 0.9,
                  y: 20,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="relative max-h-[95vh] max-w-[95vw]"
                onClick={(event) =>
                  event.stopPropagation()
                }
              >

                {/* CLOSE BUTTON */}

                <button
                  onClick={() =>
                    setOpenCertificate(false)
                  }
                  className="absolute -right-3 -top-3 z-20 rounded-full bg-white p-3 text-slate-900 shadow-lg transition hover:bg-slate-100"
                >
                  <FaTimes />
                </button>

                {/* ============================
                    PDF VIEW
                ============================ */}

                {certificateIsPDF ? (
                  <div className="overflow-hidden rounded-xl bg-white">

                    <iframe
                      src={certificateFile}
                      title={
                        certificate.title
                      }
                      className="h-[85vh] w-[90vw] bg-white md:w-[75vw] lg:w-[65vw]"
                    />

                  </div>
                ) : (

                  /* ============================
                     IMAGE VIEW
                  ============================ */

                  <img
                    src={certificateFile}
                    alt={certificate.title}
                    className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain shadow-2xl"
                  />

                )}
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
}


// ============================================
// INFO CARD COMPONENT
// ============================================

function InfoCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100">

      <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">

        <span className="text-slate-700">
          {icon}
        </span>

        {label}

      </div>

      <div className="break-words text-base font-medium text-slate-900">
        {value || "N/A"}
      </div>

    </div>
  );
}