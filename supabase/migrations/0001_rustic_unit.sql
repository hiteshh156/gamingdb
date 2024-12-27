/*
  # Create reviews and tournaments tables

  1. New Tables
    - `reviews`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `game_id` (integer)
      - `rating` (integer)
      - `content` (text)
      - `created_at` (timestamp)
    - `tournaments`
      - `id` (uuid, primary key)
      - `creator_id` (uuid, references auth.users)
      - `game_id` (integer)
      - `title` (text)
      - `description` (text)
      - `start_date` (timestamp)
      - `max_participants` (integer)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for CRUD operations
*/

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  game_id integer NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES auth.users NOT NULL,
  game_id integer NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  start_date timestamptz NOT NULL,
  max_participants integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tournaments"
  ON tournaments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create tournaments"
  ON tournaments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);