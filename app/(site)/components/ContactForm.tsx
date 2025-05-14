"use client";

import { useForm, ValidationError } from "@formspree/react";
import { useState, useRef, useEffect } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("meoojpqj");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (state.succeeded) {
    return (
      <p>
        Vielen Dank für Ihre Nachricht! Wir haben Ihre Anfrage erhalten und
        werden uns schnellstmöglich bei Ihnen melden.
      </p>
    );
  }

  const genderOptions = ["Frau", "Herr", "neutral"];

  interface HandleSelectGenderProps {
    option: string;
  }

  const handleSelectGender = (
    option: HandleSelectGenderProps["option"]
  ): void => {
    setSelectedGender(option);
    setDropdownOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formfield">
        <label htmlFor="gender">Anrede</label>
        <div className="relative w-full" ref={dropdownRef}>
          <div
            className="bg-neutral-300 px-4 py-2 cursor-pointer w-full flex justify-between items-center"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className={selectedGender ? "" : "text-gray-500"}>
              {selectedGender || "auswählen"}
            </span>
            <div className="text-gray-500">
              {dropdownOpen ? <UpOutlined /> : <DownOutlined />}
            </div>
          </div>

          {/* Custom dropdown menu */}
          {dropdownOpen && (
            <div className="absolute top-full left-0 w-full z-10 bg-neutral-300 shadow-md">
              {genderOptions.map((option) => (
                <div
                  key={option}
                  className="px-4 py-2 cursor-pointer hover:bg-neutral-400"
                  onClick={() => handleSelectGender(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}

          {/* Hidden input for form submission */}
          <input type="hidden" name="gender" value={selectedGender} />
        </div>
        <ValidationError prefix="Gender" field="gender" errors={state.errors} />
      </div>

      <div className="formfield">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" name="name" />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>

      <div className="formfield">
        <label htmlFor="email">Email Address</label>
        <input id="email" type="email" name="email" />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div className="formfield">
        <label htmlFor="message">Nachricht</label>
        <textarea id="message" name="message" rows={7} />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>

      <button type="submit" disabled={state.submitting}>
        senden
      </button>
      <ValidationError errors={state.errors} />
    </form>
  );
}
