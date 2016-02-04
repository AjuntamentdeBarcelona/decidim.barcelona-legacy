class Recommendations::Engine
  def self.get_recommendations(pref_matrix, subject_id, object_ids, exclude_object_ids = [], n = 100)
    totals = {}
    simSums = {}

    subject_preferences = pref_matrix[subject_id]

    pref_matrix.each do |other_subject_id, other_subject_preferences|
      if other_subject_id != subject_id
        sim = sim_distance(object_ids, subject_preferences, other_subject_preferences)

        if sim > 0
          object_ids.each do |object_id|
            if totals[object_id].nil?
              totals[object_id] = 0
            end

            if simSums[object_id].nil?
              simSums[object_id] = 0 
            end

            totals[object_id]  += (other_subject_preferences[object_id] || 0) * sim
            simSums[object_id] += sim
          end
        end
      end
    end

    rankings = totals.inject([]) do |result, (object_id, total)|
      result.push([total / simSums[object_id], object_id])
    end

    rankings.reject! do |score, object_id| 
      exclude_object_ids.include?(object_id)
    end

    rankings.sort.reverse.take(n)
  end

  def self.sim_distance(object_ids, subject_preferences, other_subject_preferences)
    diff_squares = Array.new(object_ids.length)

    object_ids.each_with_index do |object_id, index|
      subject_weight = subject_preferences[object_id] || 0
      other_subject_weight = other_subject_preferences[object_id] || 0
      diff_squares[index] = (subject_weight - other_subject_weight) ** 2
    end

    return 0 if diff_squares.empty?

    1 / (1 + Math.sqrt(diff_squares.sum))
  end
end
