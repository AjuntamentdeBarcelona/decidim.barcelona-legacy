# Compute object recommendations for a given subject using the Euclidean Distance
class Recommendations::Engine
  # Static
  #
  # Compute object recommendations for a given subject based on the preferences matrix.
  #
  # It uses the similitude distance between the given subject and all subjects.
  # If that similitude is greater than 0 it accumulate weights and similitude distances
  # to compute the final score of each object.
  #
  # pref_matrix        - A hash where each key is a subject id and each value is another hash
  #                      where each key is a object id and each value is the weight of the object
  #                      for that subject. A visual representation of this matrix could be:
  #                      {
  #                        "1" => { "1" => 10, "2" => 5, "5" => 8 },
  #                        "2" => { "1" => 4 , "2" => 2           },
  #                        "3" => { "1" => 6 , "3" => 5, "4" => 1 }
  #                      }
  # subject_id         - id of the subject to compute his recommendations
  # object_ids         - A collection of object ids to sort by recommendation score
  # exclude_object_ids - A collection of object ids to exclude them from the final result
  # n                  - The maximum number of the recommendations
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

  # Static
  #
  # Compute the similitude distance between two preferences vectors using
  # the Euclidean Distance: sqrt((x1-x2)^2 + (y1-y2)^2)
  #
  # If a object id is not on a preferences vector the weight value is
  # considered to be 0.
  #
  # object_ids                - Collection of object identifiers
  # subject_preferences       - A hash where each key correspond to a object id and
  #                             each value correspond to the weight of that object to
  #                             the subject
  # other_subject_preferences - A hash where each key correspond to a object id and
  #                             each value correspond to the weight of that object to
  #                             the other subject
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
